import { errorDiv } from '../../../styles/styles';

interface Props {
    errorMessage: string;
}

const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
    return (
        <div style={errorDiv}>
            <p>{errorMessage}</p>
        </div>
    );
};

export default ErrorMessage;
