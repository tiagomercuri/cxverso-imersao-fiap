import { Component, inject } from "@angular/core";
import { RouterOutlet,RouterLink,RouterLinkActive,Router} from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    imports:[RouterLink,RouterLinkActive,RouterOutlet,CommonModule],
    templateUrl:'./layout.component.html'

})
export class LayoutComponent{

    role = localStorage.getItem('role');

    // Injetando o serviço router
    //motor que o angular permite mudar a url e trocar de compoenente via código
    private router= inject(Router);

    
    sair(){
        localStorage.clear();
        this.router.navigate(["/login"])
    }

}