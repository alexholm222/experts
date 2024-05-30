export const handleFilterObject = (query, list) => {
    const result = list.filter(el => el.name.concat(el.surname).concat(el.city).concat(el.phone).toLowerCase().indexOf(query.toLowerCase()) !== -1);
    return result;
}
