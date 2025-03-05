export function useSorting() {
  const sortById = (event: any) => {
    const data = [...event.data];
    const order = event.order;
    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      let j = i - 1;
      while (j >= 0 && compareIds(data[j].id, current.id, order)) {
        data[j + 1] = data[j];
        j--;
      }
      data[j + 1] = current;
    }
    return data;
  };

  const compareIds = (a: string, b: string, order: number) => {
    const numA = Number(a);
    const numB = Number(b);
    return order === 1 ? numA > numB : numA < numB;
  };

  const sortByLogin = (event: any) => {
    const data = [...event.data];
    const order = event.order;
    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      let j = i - 1;
      while (j >= 0 && compareLogins(data[j].login, current.login, order)) {
        data[j + 1] = data[j];
        j--;
      }
      data[j + 1] = current;
    }
    return data;
  };

  const compareLogins = (a: string, b: string, order: number) => {
    const lengthA = a.length;
    const lengthB = b.length;
    return order === 1 ? lengthA > lengthB : lengthA < lengthB;
  };

  const sortByRegDate = (event: any) => {
    const data = [...event.data];
    const order = event.order;
    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      let j = i - 1;
      while (j >= 0 && compareDates(data[j].regdate, current.regdate, order)) {
        data[j + 1] = data[j];
        j--;
      }
      data[j + 1] = current;
    }
    return data;
  };

  const compareDates = (a: string, b: string, order: number) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return order === 1 ? dateA > dateB : dateA < dateB;
  };

  return {
    sortById,
    sortByLogin,
    sortByRegDate,
    compareDates,
    compareIds
  };
}
