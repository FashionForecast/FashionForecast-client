import Cold from '@/components/icon/Temperature/Cold.svg';
import Cool from '@/components/icon/Temperature/Cool.svg';
import Hot from '@/components/icon/Temperature/Hot.svg';
import Moderate from '@/components/icon/Temperature/Moderate.svg';
import Warm from '@/components/icon/Temperature/Warm.svg';

const HandleTemp = (typicalTemp: number) => {
    
        let TempIcon = null;
    
        if (typicalTemp <= 16) {
            TempIcon = <img src = {Cold}/>;
        } else if (typicalTemp >16 && typicalTemp <= 19) {
            TempIcon = <img src = {Cool}/>;
        } else if (typicalTemp >19 && typicalTemp <= 22) {
            TempIcon = <img src = {Moderate}/>;
        } else if (typicalTemp >22 && typicalTemp <= 27) {
            TempIcon = <img src = {Warm} />;
        } else if (typicalTemp >27) {
            TempIcon = <img src = {Hot} />;
        }
    
        return TempIcon ;
}
export default HandleTemp;