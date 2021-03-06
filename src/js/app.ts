namespace application {
    export class appController {

        public isLoading: boolean = false;

        public startyear = 1976;
        public endyear = 2016;
        public year = "Select Year"
        public years: number[] = [];

        public colleges: string[] = [];
        public positions: string[] = [];

        public players: models.player[] = [];

        static $inject = [
            '$http'
        ];

        constructor(
            private $http: ng.IHttpService
        ) {
            console.log(this.players)
            let current = 0;
            while(this.startyear + current <= this.endyear){
                this.years[current] = this.startyear + current
                current++;
            }
        }

        public getPlayers(year: number): void {
            this.isLoading = true;
            this.year = year.toString();

            this.$http.get(`data/roster-${year}.json`)
            .then((result) => {
                    this.colleges = [];
                    this.positions = [];
	                this.players = <models.player[]>result.data;
	                for( let player of this.players){
                        if(this.colleges.indexOf(player.college) == -1){
                            this.colleges.push(player.college);
                        }
                        if(this.positions.indexOf(player.position) == -1){
                            this.positions.push(player.position);
                        }
                    }
	            })
                .catch((error) => console.log('no worke', error))
                .finally(() => this.isLoading = false);
        }
    }

    angular
        .module('app', [])
        .controller('appController', appController);
}
