import React from 'react';
import useWeb3 from '../hooks/web3.hook';

const VotingTestPage: React.FC = () => {
    const {user,web3} = useWeb3();

    

    return (
        <div>VotingTestPage</div>
    )
}

export default VotingTestPage;