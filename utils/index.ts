import { CarProps, FilterProps } from "@/types";


export async function fetchCars(filters: FilterProps) {

  const {manufacturer, model, year, fuel, limit } = filters;

    const headers = {
        'x-rapidapi-key': '420f0f1aacmsh703b7ff24b12b38p1d1c7djsn60957239a67f',
        'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {headers: headers});

    const result = await response.json();

    return result;

}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
};
  

export const generateCarImageUrl = async (car: CarProps) => {
  const { make, model } = car;
  const carImageryApiUrl = `https://www.carimagery.com/api.asmx/GetImageUrl`;

  try {
    // Fetch image URL from Car Imagery API
    const response = await fetch(`${carImageryApiUrl}?searchTerm=${make} ${model}`);
    const xmlText = await response.text(); // Get the response as XML text

    // Parse the XML to extract the URL
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
    const imageUrl = xmlDoc.getElementsByTagName("string")[0].textContent;

    // Check if a valid image URL is returned
    return imageUrl ? imageUrl : null;
  } catch (error) {
    console.error('Error fetching or parsing image from Car Imagery API:', error);
    return null;
  }
};



export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);
        
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
}


  
