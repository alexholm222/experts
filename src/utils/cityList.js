export default function HandleCityList(query, cities) {
    const result = cities.filter(city => city.toLowerCase().startsWith(query.toLowerCase()));
    return result;
}