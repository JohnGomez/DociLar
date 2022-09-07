/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.sistema.auxiliares;

import br.com.sistema.controller.PessoaService;
import br.com.sistema.model.Genero;
import br.com.sistema.model.Pessoa;
import br.com.sistema.util.HibernateUtil;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author John
 */
public class Executar {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {

        Pessoa p = new Pessoa();
        PessoaService ps = new PessoaService();
        p.setCpf("888888888888888");
        p.setNome("QUALQUER NOME PARA TESTE");
        p.setGenero(Genero.MASCULINO);

        ps.salvar(p);

        Session sessao = HibernateUtil.getSessionFactory().openSession();
        Transaction transc = sessao.beginTransaction();
        List<Pessoa> pessoas = new ArrayList<>();
        pessoas = sessao.createCriteria(Pessoa.class).list();
       
        transc.commit();
        sessao.close();
        
        for (int i = 0; i < pessoas.size(); i++) {
            System.out.println(pessoas.get(i).getNome());
            
        }
        
        

    }

}
