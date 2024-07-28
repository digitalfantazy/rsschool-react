export const downloadCsv = (
  data: { id: number; name: string; ingredients: string[]; instructions: string[] }[],
) => {
  const csvContent = data
    .map((e) => `${e.id},${e.name},${e.ingredients.join(';')},${e.instructions.join(',')}`)
    .join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  return URL.createObjectURL(blob);
};
