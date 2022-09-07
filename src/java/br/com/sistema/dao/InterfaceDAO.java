/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package br.com.sistema.dao;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author John
 */
public interface InterfaceDAO<T, ID extends Serializable > {
    
    Class<T> getObjectClass();
    
    void salvar(T object);
    
    void excluir(T object);
    
    void alterar(T object);
    
    T getBean(ID id);
    
    List<T> getBeans();
    
 
    
    
    
    
    
}
