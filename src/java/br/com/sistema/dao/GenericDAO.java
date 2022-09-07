package br.com.sistema.dao;

import br.com.sistema.util.HibernateUtil;
import java.io.Serializable;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author John
 */
public class GenericDAO<T, ID extends Serializable> implements InterfaceDAO<T, ID> {

    private Class<T> oClass;

    @Override
    public Class<T> getObjectClass() {
        throw new UnsupportedOperationException("Not supported yet."); 
    }

    @Override
    public void salvar(T object) {
        Session sessao = HibernateUtil.getSessionFactory().openSession();
        Transaction transacao = sessao.beginTransaction();
        
        try {
            sessao.save(object);
            transacao.commit();

        } catch (Exception e) {
        } finally {
            sessao.close();
        }

    }

    @Override
    public void excluir(T object) {
        Session sessao = HibernateUtil.getSessionFactory().openSession();
        Transaction transacao = sessao.beginTransaction();
        try {
            sessao.delete(object);
            transacao.commit();
        } catch (Exception e) {
        } finally {

            sessao.close();
        }

    }

    @Override
    public void alterar(T object) {
        Session sessao = HibernateUtil.getSessionFactory().openSession();
        Transaction transacao = sessao.beginTransaction();

        try {

            sessao.update(object);
            transacao.commit();

        } catch (Exception e) {

        } finally {
            sessao.close();
        }

    }

    @Override
    public T getBean(ID id) {
        Session sessao = HibernateUtil.getSessionFactory().openSession();
        Transaction transacao = sessao.beginTransaction();
        try {
            T bean = (T) sessao.get(oClass, id);

            transacao.commit();
            return bean;

        } catch (Exception e) {

        } finally {
            sessao.close();

        }
        return null;
    }

    @Override
    public List<T> getBeans() {
        Session sessao = HibernateUtil.getSessionFactory().openSession();
      
        try {
            List list = sessao.createCriteria(oClass).list();
            return list;
           
        } catch (Exception e) {
        } finally {

            sessao.close();

        }
        return null;

    
    }

  

}
