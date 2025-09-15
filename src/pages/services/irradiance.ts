const parameters = ["ALLSKY_SFC_SW_DWN"];
// const latitude = 51.8224;
// const longitude = 4.2584;
const community = "RE";
const startYear = 2020;
const endYear = 2024;

async function fetchNasa(lat: number, lng: number) {
    console.log(lat, lng);
    const url =
        `https://power.larc.nasa.gov/api/temporal/monthly/point` +
        `?parameters=${parameters.join(",")}` +
        `&community=${community}` +
        `&latitude=${lat.toString()}` +
        `&longitude=${lng.toString()}` +
        `&start=${startYear}` +
        `&end=${endYear}` +
        `&format=JSON`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `NASA API error: ${response.status} ${response.statusText}`
        );
    }
    return await response.json();
}

export async function getIrradiance(lat: number, lng: number) {
    const data = await fetchNasa(lat, lng);
    console.log(data);

    const solarData = data.properties.parameter.ALLSKY_SFC_SW_DWN;

    const monthSums: Record<string, number> = {};
    const monthCounts: Record<string, number> = {};

    for (const key in solarData) {
        const month = key.slice(4);

        console.log(month);

        if (!monthSums[month]) {
            monthSums[month] = 0;
            monthCounts[month] = 0;
        }
        monthSums[month] += solarData[key];
        monthCounts[month] += 1;
    }

    const monthAverages: Record<string, number> = {};
    for (const month in monthSums) {
        monthAverages[month] = monthSums[month] / monthCounts[month];
    }

    return monthAverages;
}
