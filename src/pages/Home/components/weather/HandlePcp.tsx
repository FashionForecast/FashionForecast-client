import Clear from '@/components/icon/Pcp/PClear.svg';
import Rain from '@/components/icon/Pcp/PRain.svg';
import RainDrop from '@/components/icon/Pcp/PRaindrop.svg';

const handlePcP = (nowPcp: string) => {
    if (!nowPcp) {
        return null;
    }
    if (nowPcp === '강수없음') {
        return <img src={Clear}
                    style={{width:'1rem', height:'1rem'}} alt='0%' />;
    } else if (nowPcp === '1mm 미만' || Number(nowPcp.slice(0,3))< 3) {
        return <img src={RainDrop} 
        style={{width:'1rem', height:'1rem'}} alt='10%' />;
    } else  {
        return <img src={Rain} 
        style={{width:'1rem', height:'1rem'}} alt='20%' />;
    } 

}
export default handlePcP;