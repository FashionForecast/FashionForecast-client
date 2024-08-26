import Clear from '@/components/icon/Pcp/PClear.svg';
import Rain from '@/components/icon/Pcp/PRain.svg';
import RainDrop from '@/components/icon/Pcp/PRaindrop.svg';

const HandlePcP = (maxPcp: number) => {

    let PcpIcon = null;

    if (maxPcp === 0) {
        PcpIcon = <img src={Clear} alt='0%' />;
    } else if (maxPcp < 3) {
        PcpIcon = <img src={RainDrop} alt='10%' />;
    } else  {
        PcpIcon = <img src={Rain} alt='20%' />;
    } 

    return PcpIcon ;

}
export default HandlePcP;