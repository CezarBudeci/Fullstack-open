import { Diagnose } from '../../../../types';

interface Props {
    diagnosis: Array<Diagnose>;
}

const DiagnosisCodes: React.FC<Props> = ({ diagnosis }) => {
    return (
        <div>
            <ul>
                {diagnosis &&
                    diagnosis.map((diagnose, index) => (
                        <li key={diagnose.code + '_' + index}>
                            {diagnose.code} {diagnose.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default DiagnosisCodes;
