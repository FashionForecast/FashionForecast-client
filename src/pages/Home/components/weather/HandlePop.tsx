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

const handlePoP = (maxPop: number) => {
    let PopIcon = null;

    if (maxPop === 0) {
        PopIcon = <img src={Pop0} alt='0%' />;

    } else if (maxPop === 10) {
        PopIcon = <img src={Pop10} alt='10%' />;
    } else if (maxPop === 20) {
        PopIcon = <img src={Pop20} alt='20%' />;
    } else if (maxPop === 30) {
        PopIcon = <img src={Pop30} alt='30%' />;
    } else if (maxPop === 40) {
        PopIcon = <img src={Pop40} alt='40%' />;
    } else if (maxPop === 50) {
        PopIcon = <img src={Pop50} alt='50%' />;
    } else if (maxPop === 60) {
        PopIcon = <img src={Pop60} alt='60%' />;
    } else if (maxPop === 70) {
        PopIcon = <img src={Pop70} alt='70%' />;
    } else if (maxPop === 80) {
        PopIcon = <img src={Pop80} alt='80%' />;
    } else if (maxPop === 90) {
        PopIcon = <img src={Pop90} alt='90%' />;
    } else if (maxPop === 100) {
        PopIcon = <img src={Pop100} alt='100%' />;
    }

    return PopIcon ;
}
export default handlePoP;