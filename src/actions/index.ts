import axios from "axios";

export interface Loan {
    id: number;
    loanNumber: string;
}

axios.get<Loan[]>("http://localhost:9090/infosource/analytics/loansearch/53").then(response => {
    console.log(response);
})
.catch(error => {
    console.log(error);
});

