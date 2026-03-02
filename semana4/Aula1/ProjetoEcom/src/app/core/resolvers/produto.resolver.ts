
// Importa o tipo 'ResolveFn', que define esta função como uma "preparadora de dados" para rotas.
import { ResolveFn } from '@angular/router';

// Importa o 'inject' para podermos usar o serviço de produtos dentro de uma função.
import { inject } from '@angular/core';

// Importa o serviço que contém a lógica de busca e a interface que define o que é um Produto.
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../../models/produto'; 

/*
 * Define o 'produtoResolver'. Ele promete entregar um 'Produto' ou 'undefined' antes da tela abrir.
 * O Angular aguarda esta função terminar para só então mostrar o componente ao usuário.
 */
export const produtoResolver: ResolveFn<Produto | undefined> = (route) => {
  
  // Captura o 'id' que está na URL (ex: /produtos/123).
  const idStr = route.paramMap.get('id');

  // Se por algum motivo não houver ID na URL, paramos o processo retornando indefinido.
  if (!idStr) return undefined;

  /* BUSCA ANTECIPADA:
   * Injetamos o ProdutoService e chamamos o método de busca.
   * O Angular segura a navegação até que o serviço responda com os dados do produto.
   */
  return inject(ProdutoService).obterProdutoPorId(idStr);
};