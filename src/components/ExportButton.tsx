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
      className="text-sm font-medium px-5 py-2.5 transition-colors"
      style={{
        border: '1px solid var(--color-ink)',
        borderRadius: 2,
        color: 'var(--color-ink)',
      }}
    >
      Export JSON
    </button>
  );
}

export default ExportButton;
