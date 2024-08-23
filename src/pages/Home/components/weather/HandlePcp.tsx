import Clear from '@/components/icon/Pcp/PClear.svg';
import Rain from '@/components/icon/Pcp/PRain.svg';
import RainDrop from '@/components/icon/Pcp/PRaindrop.svg';

const HandlePcP = (nowPcp: string) => {

    let PcpText = '';
    let PcpIcon = null;


    if (nowPcp === '강수없음') {
        PcpText = '0mm';
        PcpIcon = <img src={Clear} style={{width:'24px', height:'24px'}} alt='0%' />;
    } else if (nowPcp === '1mm 미만' || Number(nowPcp.slice(0,3))< 3) {
        PcpText = `${nowPcp}mm`;
        PcpIcon = <img src={RainDrop} style={{width:'24px', height:'24px'}} alt='10%' />;
    } else  {
        PcpText = `${nowPcp}mm`;
        PcpIcon = <img src={Rain} style={{width:'24px', height:'24px'}} alt='20%' />;
    } 

    return { PcpText, PcpIcon };

}
export default HandlePcP;