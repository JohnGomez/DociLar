/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package br.com.sistema.auxiliares;

import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;

/**
 *
 * @author John
 */
public class GrowlView {
    
    private String mensagem;

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
    
    public void saveMessage(){
        FacesContext context = FacesContext.getCurrentInstance();
        context.addMessage(null, new FacesMessage("Erro", "usuário o senha incorreta, tente novamente!" + mensagem));
    
    }
    
}
