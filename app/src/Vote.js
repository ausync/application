import React, { Component,useEffect,useState,useRef } from 'react';

function Vote(props) {
    let candidates = {"Ihsan": "candidate-1", "Mokhta": "candidate-2"};

    //const contract = props.contract;

    const [candidatesCounts, setCandidatesCounts ] = useState(null);
    const [candidateName, setCandidateName] = useState(null);

    async function loadCandidatesAndVotes() {
        if (!props.contract){
            return;
        }
        const { totalVotesFor } = props.contract.methods;
        //const { sendCoin } = this.meta.methods;
        //await sendCoin(receiver, amount).send({ from: this.account });
        let candidateNames = Object.keys(candidates);
        let candidatesC = {};
        for (var i = 0; i < candidateNames.length; i++) {
          let name = candidateNames[i];
          var count = await totalVotesFor(window.web3.utils.asciiToHex(name)).call();
          //$("#" + candidates[name]).html(count);
          candidatesC[name] = count;
        }
        setCandidatesCounts(candidatesC);
    };

    async function voteForCandidate() {
        const { totalVotesFor, voteForCandidate } = props.contract.methods;

        /* Voting.deployed() returns an instance of the contract. Every call
         * in Truffle returns a promise which is why we have used then()
         * everywhere we have a transaction call
         */
        await voteForCandidate(window.web3.utils.asciiToHex(candidateName)).send({gas: 140000, from: props.account});
        let div_id = candidates[candidateName];
        let count = await totalVotesFor(window.web3.utils.asciiToHex(candidateName)).call();

        let copy = JSON.parse(JSON.stringify(candidatesCounts));
        copy[candidateName] = count;
        await setCandidatesCounts(copy);
    };

    //const handleChangeCandidate = e => {
    //    e.setState({ input: e.target.value });
    //};

    useEffect(async () => {
        await loadCandidatesAndVotes();
    }, [props.contract, candidateName]);

    return (
<div class="container">
 <h1>A Simple Hello World Voting Application</h1>
 <div class="table-responsive">
  <table class="table table-bordered">
   <thead>
    <tr>
     <th>Candidate</th>
     <th>Votes</th>
    </tr>
   </thead>
   <tbody>
    <tr>
     <td>Ihsan</td>
     <td id="candidate-1">
        {(candidatesCounts!=null)?
            <span>{candidatesCounts["Ihsan"]}</span>:
            <span>Loading..</span>}
     </td>
    </tr>
    <tr>
     <td>Mokhta</td>
     <td id="candidate-2">
        {(candidatesCounts!=null)?
            <span>{candidatesCounts["Mokhta"]}</span>:
            <span>Loading..</span>}
     </td>
    </tr>
   </tbody>
  </table>
 </div>
 <input type="text" id="candidate" onChange={ e => setCandidateName(e.target.value) } />
 <button onClick={voteForCandidate} class="btn btn-primary">Vote</button>
</div>
    );
}

export default Vote;
