import { Download, FileJson } from 'lucide-react';
import type { DiagnosticResults } from '../types';

interface ExportButtonProps {
  results: DiagnosticResults;
}

export function ExportButton({ results }: ExportButtonProps) {
  const handleExport = () => {
    // Prepare export data
    const exportData = {
      exportedAt: new Date().toISOString(),
      completedAt: results.completedAt,
      overallScore: results.overallScore,
      dimensionScores: results.dimensionScores,
      responses: Object.fromEntries(results.responses),
    };

    // Create blob and download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagnostic-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[var(--color-secondary)]"
    >
      <Download className="w-4 h-4" />
      <span>Export</span>
      <FileJson className="w-4 h-4" />
    </button>
  );
}

export default ExportButton;
