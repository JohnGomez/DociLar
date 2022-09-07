package br.com.sistema.controller;

import br.com.sistema.dao.GenericDAO;

import br.com.sistema.model.Bairro;
import br.com.sistema.model.Cidade;
import br.com.sistema.model.Cliente;
import br.com.sistema.model.Endereco;
import br.com.sistema.model.Estado;
import br.com.sistema.model.Pessoa;
import br.com.sistema.model.Rua;
import br.com.sistema.util.HibernateUtil;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author John
 */
@ManagedBean
@RequestScoped
public class PessoaService extends GenericDAO<Object, Serializable> {

    private Pessoa pessoa = new Pessoa();
    private List<Pessoa> pessoas = new ArrayList<>();
    private Endereco endereco = new Endereco();
    private Rua rua = new Rua();
    private String filtro;
    private String buscaCep;

    public PessoaService() {

    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Rua getRua() {
        return rua;
    }

    public void setRua(Rua rua) {
        this.rua = rua;
    }

    public String getBuscaCep() {
        return buscaCep;
    }

    public void setBuscaCep(String buscaCep) {
        this.buscaCep = buscaCep;
    }

    public List<Pessoa> getPessoas() {
        return pessoas;
    }

    public void setPessoas(List<Pessoa> pessoas) {
        this.pessoas = pessoas;
    }

    public String getFiltro() {
        return filtro;
    }

    public void setFiltro(String filtro) {
        this.filtro = filtro;
    }

    public void salvarEndereco() {

        salvar(endereco);
    }

    public String goToForm() {
        pessoa = new Pessoa();
        return "faces/pages/cliente/form.xhtml";
    }

    public void salvarPessoa() {
        salvarEndereco();
  //      pessoa.setEndereco(endereco);
        salvar(pessoa);

        this.pessoa = new Pessoa();
        this.endereco = new Endereco();
        buscaCep = null;
        rua = null;

    }

    public List<Pessoa> buscarPessoas() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction trans = session.beginTransaction();
        this.pessoas = session.createCriteria(Pessoa.class).list();
        trans.commit();
        session.close();
        return pessoas;
    }

    public void pesquisarCEP() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction trans = session.beginTransaction();
        Rua ruaTemp = (Rua) session.createCriteria(Rua.class).add(Restrictions.eq("cep", buscaCep)).uniqueResult();
        this.rua = ruaTemp;
        trans.commit();
        session.close();
        this.endereco.setRua(rua);
        this.endereco.setBairro(rua.getBairro());
        this.endereco.setCidade(rua.getBairro().getCidade());
        this.endereco.setEstado(rua.getBairro().getCidade().getEstado());

        System.out.println(ruaTemp.getNome() + " " + ruaTemp.getBairro().getNome() + " "
                + ruaTemp.getBairro().getCidade().getNome() + " "
                + ruaTemp.getBairro().getCidade().getEstado().getSigla());

    }

    public List<Pessoa> filtrarPessoas() {
        if (filtro.isEmpty()) {
            buscarPessoas();
            return null;
        }
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction trans = session.beginTransaction();
        this.pessoas = session.createCriteria(Pessoa.class).add(Restrictions.eq("nome", filtro)).list();
        trans.commit();
        session.close();
        return pessoas;

    }

    public void ExcluirPessoa(Pessoa pessoa) {
        excluir(pessoa);
    }

    public void AtualizarPessoa(Pessoa pessoa) {
        alterar(pessoa);
    }
}
