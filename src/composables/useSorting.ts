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

  const sortByName = (event: any) => {
    const data = [...event.data];
    const order = event.order;
    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      let j = i - 1;
      while (j >= 0 && compareNames(data[j].username, current.username, order)) {
        data[j + 1] = data[j];
        j--;
      }
      data[j + 1] = current;
    }
    return data;
  };

  const compareNames = (a: string, b: string, order: number) => {
    const lengthA = a.length;
    const lengthB = b.length;
    return order === 1 ? lengthA > lengthB : lengthA < lengthB;
  };

  const sortByActive = (event: any) => {
    const data = [...event.data];
    const order = event.order;
    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      let j = i - 1;
      while (j >= 0 && compareActive(data[j].active, current.active, order)) {
        data[j + 1] = data[j];
        j--;
      }
      data[j + 1] = current;
    }
    return data;
  };

  const compareActive = (a: boolean, b: boolean, order: number) => {
    return order === 1 ? a > b : a < b;
  };

  const sortByToken = (event: any) => {
    const data = [...event.data];
    const order = event.order;
    for (let i = 1; i < data.length; i++) {
      const current = data[i];
      let j = i - 1;
      while (j >= 0 && compareTokens(data[j].token, current.token, order)) {
        data[j + 1] = data[j];
        j--;
      }
      data[j + 1] = current;
    }
    return data;
  };

  const compareTokens = (a: string, b: string, order: number) => {
    const lengthA = a.length;
    const lengthB = b.length;
    return order === 1 ? lengthA > lengthB : lengthA < lengthB;
  };

  return {
    sortById,
    sortByLogin,
    sortByRegDate,
    sortByName,
    sortByActive,
    sortByToken,
  };
}
