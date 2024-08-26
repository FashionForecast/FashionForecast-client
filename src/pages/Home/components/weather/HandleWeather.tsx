import DClear from '@/components/icon/Weather/DayClear.svg';
import DPartlyCloudy from '@/components/icon/Weather/DayPartlyCloudy.svg';
import Cloudy from '@/components/icon/Weather/Cloudy.svg';
import Rain from '@/components/icon/Weather/Rain.svg';
import Raindrop from '@/components/icon/Weather/Raindrop.svg';
import Shower from '@/components/icon/Weather/Shower.svg';
import Rainsnow from '@/components/icon/Weather/RainSnow.svg';
import Snow from '@/components/icon/Weather/Snow.svg';
import RDSnowDrifting from '@/components/icon/Weather/RDSnowDrifting.svg';
import SnowDrifting from '@/components/icon/Weather/SnowDrifting.svg';


//WeatherTimeline에 사용 예정
//Todo: style 제거 예정

const handleWeather = (nowWeather: string) => {
    if (nowWeather === 'CLEAR') {
        return <img src={DClear}
                    style={{width:'1rem', height:'1rem'}} alt='CLEAR' />;
    } else if (nowWeather === 'PARTLY_CLOUDY') {
        return <img src={DPartlyCloudy} 
        style={{width:'1rem', height:'1rem'}} alt='10%' />;
    } else if (nowWeather === 'CLOUDY') {
        return <img src={Cloudy} 
        style={{width:'1rem', height:'1rem'}} alt='20%' />;
    } else if (nowWeather === 'RAIN') {
        return <img src={Rain} 
        style={{width:'1rem', height:'1rem'}} alt='30%' />;
    } else if (nowWeather === 'RAIN_DROP') {
        return <img src={Raindrop} 
        style={{width:'1rem', height:'1rem'}} alt='40%' />;
    } else if (nowWeather === 'Shower') {
        return <img src={Shower} 
        style={{width:'1rem', height:'1rem'}} alt='50%' />;
    } else if (nowWeather === 'RAIN_AND_SNOW') {
        return <img src={Rainsnow} 
        style={{width:'1rem', height:'1rem'}} alt='60%' />;
    } else if (nowWeather === 'SNOW') {
        return <img src={Snow} 
        style={{width:'1rem', height:'1rem'}} alt='70%' />;
    } else if (nowWeather === 'RAIN_AND_SNOW_FLURRIES') {
        return <img src={RDSnowDrifting} 
        style={{width:'1rem', height:'1rem'}} alt='80%' />;
    } else if (nowWeather === 'SNOW_FLURRIES') {
        return <img src={SnowDrifting} 
        style={{width:'1rem', height:'1rem'}} alt='90%' />;
    } 

}
export default handleWeather;