import React, { useState } from 'react';
import { FULL_SQL_SCHEMA_DUMP } from '../../data/mockDatabase';

interface SqlModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableName?: string;
  onShowToast: (message: string, icon?: string) => void;
}

export const SqlModal: React.FC<SqlModalProps> = ({
  isOpen,
  onClose,
  tableName,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Filter or show full SQL
  const displayedSql = tableName
    ? FULL_SQL_SCHEMA_DUMP.split(`-- ${tableName}`).length > 1
      ? `-- ESTRUCTURA SQL PARA TABLA: ${tableName}\n` +
        FULL_SQL_SCHEMA_DUMP.substring(
          FULL_SQL_SCHEMA_DUMP.indexOf(`CREATE TABLE \`${tableName}\``),
          FULL_SQL_SCHEMA_DUMP.indexOf(`;`, FULL_SQL_SCHEMA_DUMP.indexOf(`CREATE TABLE \`${tableName}\``)) + 1
        )
      : FULL_SQL_SCHEMA_DUMP
    : FULL_SQL_SCHEMA_DUMP;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedSql);
    setCopied(true);
    onShowToast('Código SQL copiado al portapapeles', 'content_copy');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([displayedSql], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = tableName ? `aba_${tableName}_schema.sql` : `aba_neurolearning_13_tablas_dump.sql`;
    link.click();
    URL.revokeObjectURL(url);
    onShowToast(`Archivo SQL descargado: ${link.download}`, 'download_done');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#dee1f7] overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#f3f2ff] border-b border-[#dee1f7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#dde1ff] text-[#3652c2] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">terminal</span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-[#171b2a]">
                {tableName ? `Estructura DDL: Tabla \`${tableName}\`` : 'Respaldo Completo: 13 Tablas InnoDB (v2.4)'}
              </h3>
              <p className="text-xs text-[#444653]">
                Motor: InnoDB · Collation: utf8mb4_general_ci · Integridad Referencial FK
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#dee1f7] text-[#444653] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* SQL Content Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#1e202e] text-[#b8c3ff] font-mono text-xs leading-relaxed">
          <pre className="whitespace-pre-wrap">{displayedSql}</pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#faf8ff] border-t border-[#dee1f7] flex items-center justify-between">
          <span className="text-xs text-[#757685]">
            Compatible con MySQL 8.0+, MariaDB 10.5+ y phpMyAdmin
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="h-10 px-4 rounded-full bg-[#f3f2ff] hover:bg-[#dee1f7] text-[#171b2a] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? '¡Copiado!' : 'Copiar SQL'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="h-10 px-5 rounded-full bg-[#3652c2] hover:bg-[#2c43a3] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Descargar .sql</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
