const mongoose = require('mongoose');
require("../models/NumerosFrequentes");
const ModelNumerosFrequentes = mongoose.model("modelnumerosfrequentes");

const organizadorDeNumeros = function (arr, sorteioTipo){
    //Aqui é feita a contagem e organização dos numeros mais frequentes 
    let qtdArr = arr.length;
    let contNumb = 0;
    let numerosFrequentes =  [];
    
    for(let cont = 0; cont <= 60; cont++){
        for(let cont2 = 0; cont2 <= qtdArr; cont2++){
            if(cont == arr[cont2]){
                contNumb++	
            }
        }
      
        let objTemporario = {
            numero: cont,
            frequencia: contNumb
        }
      
        numerosFrequentes.push(objTemporario)
        contNumb = 0
    }

    numerosFrequentes.sort((a, b)=>{
        return b.frequencia - a.frequencia;
    })
    //fim

    //Aqui é salvo no banco de dados os numeros mais frequentes
    if(sorteioTipo == "quina"){
        ModelNumerosFrequentes.findOne({sorteioNome: sorteioTipo})
            .then((collection)=>{
                if(collection){
                    //atualiza collection
                    collection.numerosFrequentes = numerosFrequentes
                    collection.ultimaAtualizacao = Date()
                    collection.save()
                        .then(()=>{
                            console.log("collection atualizada com sucesso.")
                        })
                        .catch(()=>{
                            console.log("Não foi possivel atualizar a collection. Erro: ",err)
                        })

                }else{
                     //cria uma nova collection
                    const novaFrequencia = {
                        sorteioNome:sorteioTipo,
                        numerosFrequentes: numerosFrequentes,
                        ultimaAtualizacao: Date()
                    }

                    new ModelNumerosFrequentes(novaFrequencia).save()
                        .then(() => {
                            console.log("Frequencia salva com sucesso.")
                        })
                        .catch((err) => {
                            console.log("Frequencia não foi salva. Erro:", err)
                        })
                }
            })
            .catch((err)=>{ 
                console.log("Problema ao buscar collection. Erro:",err)
            })

    }if(sorteioTipo == "sena"){
        ModelNumerosFrequentes.findOne({sorteioNome: sorteioTipo})
            .then((collection)=>{
                if(collection){
                    collection.numerosFrequentes = numerosFrequentes
                    collection.ultimaAtualizacao = Date()
                    collection.save()
                        .then(()=>{
                            console.log("collection atualizada com sucesso.")
                        })
                        .catch((err)=>{
                            console.log("Não foi possivel atualizar a collection. Erro: ",err)
                        })
                }else{
                    //criar nova collection
                    const novaFrequencia = {
                        sorteioNome:sorteioTipo,
                        numerosFrequentes: numerosFrequentes,
                        ultimaAtualizacao: Date()
                    }

                    new ModelNumerosFrequentes(novaFrequencia).save()
                        .then(()=>{
                            console.log("Frequencia salva com sucesso.")
                        })
                        .catch((err)=>{
                            console.log("Frequencia não foi salva. Erro:", err)
                        });
                }
            })
            .catch((err)=>{
                console.log("Problema ao buscar collection. Erro:",err)
            });
    }
}
console.log(Date())
module.exports = organizadorDeNumeros;
