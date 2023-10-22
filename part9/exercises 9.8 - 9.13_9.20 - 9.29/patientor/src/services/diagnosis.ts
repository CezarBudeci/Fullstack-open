import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnose } from '../types';

const getDiagnoses = async (codes?: Array<string>) => {
    let url = `${apiBaseUrl}/diagnosis`;
    if (codes && codes.length > 0) {
        url += '?code=' + codes.join('&code=');
    }
    const { data } = await axios.get<Diagnose[]>(url);

    return data;
};

export default { getDiagnoses };
