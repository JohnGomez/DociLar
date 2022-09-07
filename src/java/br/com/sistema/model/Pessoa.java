package br.com.sistema.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;

/**
 *
 * @author John
 */
@Entity
@Table(name = "pessoa")
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @Column(name = "NOME", nullable = false )
    private String nome;
    
    @Column(name = "CPF", nullable = false)
    private String cpf;
    
    @Column(name = "RG")
    private String rg;
  
    @Enumerated(EnumType.STRING)
    @Column(name = "GENERO")
    private Genero genero;
   
    @Column(name = "TELEFONE_PRIMARIO")
    private String telefonePrincipal;
    
    @Column(name = "TELEFONE_SECUNDARIO")
    private String telefoneSecundario;
    
    @Column(name = "TELEFONE_RECADO")
    private String telefoneRecado;
    
    @Column(name = "EMAIL")
    private String email;
    
     @Column(name = "EMAIL_SECUNDARIO", length = 40)
    private String emailSecundario;
     
    @Column(name = "PROFISSAO")
    private String profissao;
    
    @Column(name = "RENDA")
    private String renda;
    
    @Column(name = "ESTADO_CIVIL", length = 20)
    private String estadoCivil;
    
    @Column(name = "DATA_NASCIMENTO", length = 20)
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dataNascimento;
    
    @Column(name = "DATA_CADASTRO")
    @Temporal(javax.persistence.TemporalType.DATE)
    private Date dataCadastro;
   
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "ENDERECO_ID" )
    private Endereco endereco;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero(Genero genero) {
        this.genero = genero;
    }

    public String getTelefonePrincipal() {
        return telefonePrincipal;
    }

    public void setTelefonePrincipal(String telefonePrincipal) {
        this.telefonePrincipal = telefonePrincipal;
    }

    public String getTelefoneSecundario() {
        return telefoneSecundario;
    }

    public void setTelefoneSecundario(String telefoneSecundario) {
        this.telefoneSecundario = telefoneSecundario;
    }

    public String getTelefoneRecado() {
        return telefoneRecado;
    }

    public void setTelefoneRecado(String telefoneRecado) {
        this.telefoneRecado = telefoneRecado;
    }

    public String getEmailSecundario() {
        return emailSecundario;
    }

    public void setEmailSecundario(String emailSecundario) {
        this.emailSecundario = emailSecundario;
    }

    

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public String getRenda() {
        return renda;
    }

    public void setRenda(String renda) {
        this.renda = renda;
    }

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(String estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Date getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(Date dataCadastro) {
        this.dataCadastro = dataCadastro;
    }


    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
       
        if (!(object instanceof Pessoa)) {
            return false;
        }
        Pessoa other = (Pessoa) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "br.com.sistema.model.Pessoa[ id=" + id + " ]";
    }

}
