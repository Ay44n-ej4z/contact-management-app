import React, { useState } from "react";
import { useQuery } from "react-query";
import { Line } from "react-chartjs-2";
import 'chart.js/auto'
import { Chart as ChartJS, CategoryScale, BarElement, Tooltip, Legend, LinearScale, PointElement } from "chart.js";
import { MapContainer, TileLayer, Marker, Popup, MarkerProps } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
ChartJS.register(
    BarElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,

)
interface CustomMarkerProps extends MarkerProps {
    onClick: () => void;
  }
  

interface CountryDataType {
    country: string;
    cases: number;
    deaths: number;
    recovered: number;
    countryInfo?: {
      iso2: string;
      iso3: string;
      flag: string;
      lat:number,
      long:number
    };
  }

type HistoricalData = {
    cases: Record<string, number>;
    deaths: Record<string, number>;
    recovered: Record<string, number>;
};
function Map({ center, zoom }: { center: [number, number], zoom: number }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  

const ChartsMap: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<CountryDataType | null>(null);
    const { isLoading: isGlobalLoading, data: globalData } = useQuery("globalData", async () => {
        const response = await fetch(
            "https://disease.sh/v3/covid-19/all"
        );
        const data = await response.json();

        return data;
    }
    );
    const { isLoading: isCountryLoading, data: countryData } = useQuery(
        "countryData", async () => {
            const response = await fetch(
                "https://disease.sh/v3/covid-19/countries?sort=cases"
            );
            const data = await response.json();
            return data;
        }
    );


    const handleMarkerClick = (country: CountryDataType) => {
        setSelectedCountry(country);
    };


    const { isLoading, data } = useQuery<HistoricalData>("graphData", async () => {
        const response = await fetch(
            "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        );
        const data = await response.json();
        return data;
    });


    return (
        <div>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 bg-white rounded-md p-6 mb-4 lg:mb-0">
                    <h3 className="text-xl font-bold mb-2">Top 10 Countries</h3>
                    <ol className="list-decimal pl-4">
                        {countryData
                            ?.slice(0, 10)
                            .map((country: CountryDataType) => (
                                <li key={country.country}>
                                    <button
                                        className="text-left"
                                        onClick={() => handleMarkerClick(country)}
                                    >
                                        {country.country} ({new Intl.NumberFormat().format(country.cases)})
                                    </button>
                                </li>
                            ))}
                    </ol>
                </div>
                <div className="w-full lg:w-2/3 h-screen">
                        <MapContainer >
                            <Map center={[20, 0]} zoom={2} />                    
                        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}{r}.png" />
                        {countryData?.map((country: CountryDataType, idx:number) => (
                           <Marker position={[country?.countryInfo?.lat || 0, country?.countryInfo?.long || 0] } 
                    >
                                <Popup>
                                    <div>
                                        <h3 className="font-bold">{country.country}</h3>
                                        <div className="flex justify-between">
                                            <p>Total Cases:</p>
                                            <p>{new Intl.NumberFormat().format(country.cases)}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Total Deaths:</p>
                                            <p>{new Intl.NumberFormat().format(country.deaths)}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Total Recovered:</p>
                                            <p>{new Intl.NumberFormat().format(country.recovered)}</p>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker > 
                        ))}
                    </MapContainer>
                </div>
                {selectedCountry && (
                    <div className="w-full lg:w-1/3 bg-white rounded-md p-6">
                        <h3 className="text-xl font-bold mb-2">{selectedCountry.country}</h3>
                        <p>Total Cases: {new Intl.NumberFormat().format(selectedCountry.cases)}</p>
                        <p>Total Deaths: {new Intl.NumberFormat().format(selectedCountry.deaths)}</p>
                        <p>Total Recovered: {new Intl.NumberFormat().format(selectedCountry.recovered)}</p>
                    </div>
                )}
            </div>
            <div className="bg-white rounded-md p-6 shadow-md">
                <h2 className="text-lg font-bold mb-4">Cases Fluctuations</h2>
                {data && (

                    <Line
                        data={{
                            labels: Object.keys(data.cases),
                            datasets: [
                                {
                                    label: 'Total Cases',
                                    data: Object.values(JSON.stringify(data.cases)),
                                    borderColor: '#FFA500',
                                    fill: false,
                                },
                                {
                                    label: 'Total Recovered',
                                    data: Object.values(JSON.stringify(data.recovered)),
                                    borderColor: '#00FF00',
                                    fill: false,

                                },
                                {

                                    label: 'Total Deaths',
                                    data: Object.values(JSON.stringify(data.deaths)),
                                    borderColor: '#FF0000',
                                    fill: false,

                                },
                            ],
                        }}
                    />
                )}
            </div>
        </div>
    )
}
export default ChartsMap;

