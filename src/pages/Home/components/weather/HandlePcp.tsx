import Clear from '@/components/icon/Pcp/PClear.svg';
import Rain from '@/components/icon/Pcp/PRain.svg';
import RainDrop from '@/components/icon/Pcp/PRaindrop.svg';

const HandlePcP = (maxPcp: number) => {

    let PcpIcon = null;

    if (maxPcp === 0) {
        PcpIcon = <img src={Clear} style={{width:'40px', height:'40px'}} alt='0%' />;
    } else if (maxPcp < 3) {
        PcpIcon = <img src={RainDrop} style={{width:'40px', height:'40px'}} alt='10%' />;
    } else  {
        PcpIcon = <img src={Rain} style={{width:'40px', height:'40px'}} alt='20%' />;
    } 

    return PcpIcon ;

}
export default HandlePcP;