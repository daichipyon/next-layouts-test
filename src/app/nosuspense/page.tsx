import React, { Suspense, use } from 'react';

export interface WeatherType {
  publishingOffice: string;
  reportDatetime: string;
  targetArea: string;
  headlineText: string;
  text: string;
}

const fetchWeather = (id: number): Promise<WeatherType> =>
  fetch(`https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${id}.json`)
    .then((r) => r.json())
    .then(
      //ウエイト追加
      (r) => new Promise((resolve) => setTimeout(() => resolve(r), 1000))
    );

const Weather = () => {
  //Reactの新機能useでデータを取り出す
  const weather = use(fetchWeather(130000));
  return (
    <div>
      <h1>{weather.targetArea}</h1>
      <div>
        {new Date(weather.reportDatetime).toLocaleString('ja-JP', {
          timeZone: 'JST',
          year: 'numeric',
          month: 'narrow',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </div>
      <div>{weather.headlineText}</div>
      <pre>{weather.text}</pre>
    </div>
  );
};

const Page = () => {
  return <Weather />;
};
export default Page;
