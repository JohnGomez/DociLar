/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.sistema.controller;

import br.com.sistema.auxiliares.GrowlView;
import br.com.sistema.model.Usuario;
import br.com.sistema.util.HibernateUtil;
import java.util.List;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author John
 *
 */
@ManagedBean
@SessionScoped
public class Login {

    private Usuario usuario = new Usuario();
    private String email;
    private String senha;

    Session session;
    Transaction tx;

    public String validarUsario() {
        try {
            session = HibernateUtil.getSessionFactory().openSession();
            tx = session.beginTransaction();
            usuario = (Usuario) session.createCriteria(Usuario.class).add(Restrictions.and(Restrictions.eq(email, "email"),
                    Restrictions.eq(senha, "senha"))).uniqueResult();
            tx.commit();
            session.close();
        } catch (Exception e) {
        }

        if (usuario == null) {
            email = "";
            senha = "";
            usuario = new Usuario();
            return "faces/index.xhtml";

        } else {
            email = "";
            senha = "";
            return "faces/home.xhtml";

        }

    }

    public Login() {
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

}
