import Pop0 from '@/components/icon/Pop/Pop_0.svg';
import Pop10 from '@/components/icon/Pop/Pop_10.svg';
import Pop20 from '@/components/icon/Pop/Pop_20.svg';
import Pop30 from '@/components/icon/Pop/Pop_30.svg';
import Pop40 from '@/components/icon/Pop/Pop_40.svg';
import Pop50 from '@/components/icon/Pop/Pop_50.svg';
import Pop60 from '@/components/icon/Pop/Pop_60.svg';
import Pop70 from '@/components/icon/Pop/Pop_70.svg';
import Pop80 from '@/components/icon/Pop/Pop_80.svg';
import Pop90 from '@/components/icon/Pop/Pop_90.svg';
import Pop100 from '@/components/icon/Pop/Pop_100.svg';

const handlePoP = (nowPop: number) => {
    if (nowPop === 0) {
        return <img src={Pop0}
                    style={{width:'1rem', height:'1rem'}} alt='0%' />;
    } else if (nowPop === 10) {
        return <img src={Pop10} 
        style={{width:'1rem', height:'1rem'}} alt='10%' />;
    } else if (nowPop === 20) {
        return <img src={Pop20} 
        style={{width:'1rem', height:'1rem'}} alt='20%' />;
    } else if (nowPop === 30) {
        return <img src={Pop30} 
        style={{width:'1rem', height:'1rem'}} alt='30%' />;
    } else if (nowPop === 40) {
        return <img src={Pop40} 
        style={{width:'1rem', height:'1rem'}} alt='40%' />;
    } else if (nowPop === 50) {
        return <img src={Pop50} 
        style={{width:'1rem', height:'1rem'}} alt='50%' />;
    } else if (nowPop === 60) {
        return <img src={Pop60} 
        style={{width:'1rem', height:'1rem'}} alt='60%' />;
    } else if (nowPop === 70) {
        return <img src={Pop70} 
        style={{width:'1rem', height:'1rem'}} alt='70%' />;
    } else if (nowPop === 80) {
        return <img src={Pop80} 
        style={{width:'1rem', height:'1rem'}} alt='80%' />;
    } else if (nowPop === 90) {
        return <img src={Pop90} 
        style={{width:'1rem', height:'1rem'}} alt='90%' />;
    } else if (nowPop === 100) {
        return <img src={Pop100} 
        style={{width:'1rem', height:'1rem'}} alt='100%' />;
    }

}
export default handlePoP;