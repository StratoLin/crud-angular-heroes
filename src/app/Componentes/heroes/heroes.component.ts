import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HeroesServicesService } from 'src/app/services/heroes-services.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  data:any[]=[];
  info: any={};
  id: any;
  submitted = false;
  loading = false;
  titulo = 'Agregar Heroe';

  formulario:FormGroup=this.fb.group({
    nombre:[ , [Validators.required]],
    equipo:[ , [Validators.required]],
    poder:[ , [Validators.required]],
    foto:[ , [Validators.required]],
  })

  editar: FormGroup=this.fb.group({
    nombre:[ , [Validators.required]],
    equipo:[ , [Validators.required]],
    poder:[ , [Validators.required]],
    foto:[ , [Validators.required]],
  })

  constructor(public heroeService:HeroesServicesService, private fb: FormBuilder
    , private toastr: ToastrService, private userService: UserService, private router: Router){
    this.heroes();
  }

  heroes(){
    this.heroeService.heroes().subscribe((resp:any)=>{
      this.data=resp;
    })
  }

  agregarHeroe(){
    if(!this.formulario.valid){
      this.formulario.markAllAsTouched();
      this.submitted = true;
      return
    }
    this.loading = true;
    this.heroeService.agregarHeroe(this.formulario.value)
    .subscribe(resp=>{
      this.heroes();
      this.toastr.success('Heroe Registrado con Éxito','Heroe Registrado',{
        positionClass: 'toast-bottom-right'
      });
      this.loading = false;
      this.formulario.reset();
    })
  }

  seleccionarHeroe(id:any){
    this.heroeService.seleccionHeroe(id)
    .subscribe((resp:any)=>{
      this.info=resp;
      this.id=id;
    })
  }

  editarHeroe(id:any){
    if(!this.editar.valid){
      this.editar.markAllAsTouched();
      return
    }
    const heroes:any={
      nombre:this.editar.value.nombre,
      equipo: this.editar.value.equipo,
      id:id,
      poder: this.editar.value.poder,
      foto: this.editar.value.foto
    }
    this.loading = true;
    this.heroeService.editarHeroe(heroes)
    .subscribe(resp=>{
      this.loading = false;
      this.toastr.info('Heroe Modificado con éxito','Heroe Modificado',{
        positionClass: 'toast-bottom-right'
      });
      this.heroes();
    })
  }

  eliminarHeroe(id:any, x:number){
    this.data.splice(x,1);
    this.heroeService.eliminarHeroe(id)
    .subscribe(resp=>console.log('Heroe Eliminado'));
    this.toastr.error('Heroe Eliminado correctamente', 'Heroe Eliminado',{
      positionClass: 'toast-bottom-right'
    });

  }

  agregarEditarHeroe(){
    this.submitted = true;
    if(this.formulario.invalid){
      return;
    }
    if(this.id === null){
      this.agregarHeroe();
    }else{
      this.editarHeroe(this.id);
    }
  }

  onClick(){
    this.userService.logout()
    .then(()=>{
      this.router.navigate(['/login']);
    })
    .catch(error => console.log(error));
  }

}
