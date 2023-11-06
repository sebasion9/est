import labels from '../../General/labels.json';
import ManageProducts from './Displays/MngProducts/ManageProducts';

const adminlabels : string[] = labels.adminLabels; 
type DisplayProps = {
    display :  typeof adminlabels[number];
}

const Display : React.FC<DisplayProps> = ({display})=>
{
    switch(display)
    {
        case 'dashboard':
            return(
                <></>
            )
        case 'manage users':
            return(
                <></>
            )
        case 'manage products':
            return(
                <ManageProducts/>
            )
    }
    return(
        <>
        </>
    )
}

export default Display;