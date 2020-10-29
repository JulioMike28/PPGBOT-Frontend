import React,{Component} from 'react'
import api from '../service/api'
import {Bar,Pie} from 'react-chartjs-2'


export default class Perpesctiva extends Component{
    constructor(props){
        super(props)

        this.state = {dados:[], anoInicio: 0, anoTitulacao: 0, filtrados:[], mestrados:0,doutorados:0,total:0, faperj:0, cnpq:0 ,capes:0, totalBolsas:0}
        this.handleChangeAnoTitulacao = this.handleChangeAnoTitulacao.bind(this)
        this.handleChangeAnoInicio = this.handleChangeAnoInicio.bind(this)
        this.filtro = this.filtro.bind(this)
        this.Mestrado = this.Mestrado.bind(this)
        this.Doutorado = this.Doutorado.bind(this)
        this.fetchAno = this.fetchAno.bind(this)
        this.handleBolsas = this.handleBolsas.bind(this)
        this.fetchBolsaAgencia = this.fetchBolsaAgencia.bind(this)
        this.fetchData()
    }

    fetchData = async()=>{
        const {data} = await api.get("/api/perspectiva")
        
        this.setState({...this.state, dados:data})
    }

    fetchAno(filtrados){
        let label = []
        let valInicio = []
        let contInicio = []
        let cni = 0
        let valTitulacao = []
        let contTitulacao = []
        let chartDataAno = {}
        let cin= 0

        filtrados.forEach(el=>{
            label.push(el.AnoInicio)
            label.push(el.AnoTitulacao)
            valInicio.push(el.AnoInicio)
            valTitulacao.push(el.AnoTitulacao)
        })
        console.log('Filtrados:', label)
        //Label arrumado
        let labelOrd = [ ...new Set(label.sort())];
        //valores
        console.log("------->LABEL:",labelOrd);
        
        console.log('valInicio:',valInicio)
        console.log('valTitulacao:',valTitulacao);
        

        labelOrd.forEach(el=>{
            
            let qnt2 = valInicio.find(dado=>dado===el)
            
            if(qnt2){
                valInicio.forEach(el=>{
                    if(el === qnt2){
                        cin++
                    }
                })
                contInicio.push(cin)
                cin=0
            }else{
                contInicio.push(0)
            }

            let qnt = valTitulacao.find(dado=>dado===el)
            if(qnt){
                valTitulacao.forEach(el=>{
                    if(el === qnt){
                        cni++
                    }
                })
                contTitulacao.push(cni)
                cni=0
            }else{
                contTitulacao.push(0)
            }
        })
        
        console.log(contInicio)
        console.log(contTitulacao);
        //Preparando chart
        chartDataAno={
            labels:labelOrd,
            datasets:[{
                label: "Ano de início no curso do PPGBot:",
                data: contInicio,
                backgroundColor: 'rgba(50,252,50,0.5) ',
                borderColor: '#32cd32',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            },{
                label: "Ano de Titulação:",
                data: contTitulacao,
                backgroundColor: 'rgba(255,252,50,0.5) ',
                borderColor: '#ffcd32',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(00,99,255,0.4)',
                hoverBorderColor: 'rgba(00,99,255,1)',
            }]
        }
        const option = {
            maintainAspectRatio: false ,
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total=0
                    dataset.data.forEach(element => {
                        total+=element
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = parseFloat((currentValue/total*100).toFixed(1));
                    return ' (' + percentage + '%)';
                },
                title: function(tooltipItem, data) {
                  return data.labels[tooltipItem[0].index];
                }
              }
            }
          }
        return <div>
            <div>
                <Bar
                data={chartDataAno}
                width={400}
                height={350}
                options={option}/>
            </div>
        </div>
    }
    
    fetchBolsaAgencia(dados){
        let labelBA=[]
        let valoresBA=[]
        let chartDataBA={}
        let contCNPQ = 0
        let contFAPERJ = 0
        let contCAPES = 0

        console.log("DADOS ---------------------> ", dados)

        dados.forEach(el=>{
            if(!(labelBA.find(x=>x===el.Agencia))){
                labelBA.push(el.Agencia)
                console.log("------------------> el.Agencia: ", el.Agencia)
            }
            if(el.Agencia === "CNPq"){
                if(el.Bolsista === "Sim"){
                    contCNPQ++
                }
            }
            if(el.Agencia === "FAPERJ"){
                if(el.Bolsista === "Sim"){
                    contFAPERJ++
                }
            }
            if(el.Agencia === "CAPES"){
                if(el.Bolsista === "Sim"){
                    contCAPES++
                }
            }
        })
        
        valoresBA.push(contCNPQ)
        valoresBA.push(contFAPERJ)
        valoresBA.push(contCAPES)
        
        console.log("---------------> labelBA: ", labelBA)
        console.log("---------------> ValoresBA: ", valoresBA);
        let vetor_back = []
        let variavel=0
        let variavel2=0
        let variavel3=0
        let el_back=0
        labelBA.forEach(el=>{
            variavel = Math.floor(Math.random() * 256)
            variavel2 = Math.floor(Math.random() * 256)
            variavel3 = Math.floor(Math.random() * 256)
            el_back = 'rgba('+variavel+','+variavel2+','+variavel3+') '
            vetor_back.push(el_back)
        })
        chartDataBA={
            labels:labelBA,
            datasets:[{
                label: 'Nº de bolsas ' + labelBA ,
                data: valoresBA,
                backgroundColor: vetor_back,
                borderColor: '#32cd32',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            }]
        }
        const option = {
            maintainAspectRatio: false ,
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var total=0
                    dataset.data.forEach(element => {
                        total+=element
                    });
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = parseFloat((currentValue/total*100).toFixed(1));
                    return ' (' + percentage + '%)';
                },
                title: function(tooltipItem, data) {
                  return data.labels[tooltipItem[0].index];
                }
              }
            }
          }
        return <div>
            <div>
                <Pie
                data={chartDataBA}
                width={400}
                height={350}
                options={option}/>
            </div>
        </div>
    }

    handleChangeAnoInicio(e){
        this.setState({...this.state, anoInicio: e.target.value})
    }
    handleChangeAnoTitulacao(e){
        this.setState({...this.state, anoTitulacao: e.target.value})
    }
    
    handleBolsas(){
        let labelBA=[]
        let valoresBA=[]
        let dados_b=this.state.dados
        let contCNPQ = 0
        let contFAPERJ = 0
        let contCAPES = 0

        dados_b.forEach(el=>{
            if(!(labelBA.find(x=>x===el.Agencia))){
                labelBA.push(el.Agencia)              
            }
            if(el.Agencia === "CNPq"){
                if(el.Bolsista === "Sim"){
                    contCNPQ++
                }
            }
            if(el.Agencia === "FAPERJ"){
                if(el.Bolsista === "Sim"){
                    contFAPERJ++
                }
            }
            if(el.Agencia === "CAPES"){
                if(el.Bolsista === "Sim"){
                    contCAPES++
                }
            }
        })
        let total_bolsas = contCNPQ + contFAPERJ + contCAPES
        valoresBA.push(contCNPQ)
        valoresBA.push(contFAPERJ)
        valoresBA.push(contCAPES)
        valoresBA.push(total_bolsas)
    
        
        return valoresBA
        
        
    }
    filtro(){
        let dadosFiltrados = []
        let qntMestrado = 0
        let qntDoutorado = 0
        let vetor_bolsas = []

        if(this.state.anoInicio && this.state.anoTitulacao){
            var inicio = this.state.anoInicio.split("-");
            var titulacao = this.state.anoTitulacao.split("-");
        }

        this.state.dados.forEach(el=>{
            if((el.AnoInicio >= inicio) && (el.AnoTitulacao <= titulacao)){
                dadosFiltrados.push(el)
            }
            if(el.Nivel === "Apenas Mestrado"){
                qntMestrado++
            }
            if(el.Nivel === "Apenas Doutorado"){
                qntDoutorado++
            }
        })
        
        let total_val = qntDoutorado + qntMestrado

        
        vetor_bolsas = this.handleBolsas()

        this.setState({...this.state, filtrados: dadosFiltrados, mestrados: qntMestrado, doutorados: qntDoutorado, total: total_val, cnpq: vetor_bolsas[0], faperj: vetor_bolsas[1], capes: vetor_bolsas[2], totalBolsas: vetor_bolsas[3]})
    }
    Mestrado(){
        let qntMestrado = 0
        let MestradosFiltrados = []
    
        if(this.state.anoInicio && this.state.anoTitulacao){
            var inicio = this.state.anoInicio.split("-");
            var titulacao = this.state.anoTitulacao.split("-");
        }

        this.state.dados.forEach(el=>{
            if((el.AnoInicio >= inicio) && (el.AnoTitulacao <= titulacao) && (el.Nivel === "Apenas Mestrado")){
                MestradosFiltrados.push(el)
                qntMestrado++
            }
        })
        
        console.log('Mestrados filtrados:',MestradosFiltrados)
        this.setState({...this.state, filtrados: MestradosFiltrados, total: qntMestrado, mestrados: qntMestrado, doutorados:0})
    }
    Doutorado(){
        let DoutoradosFiltrados = []
        let qntDoutorado = 0
    
        if(this.state.anoInicio && this.state.anoTitulacao){
            var inicio = this.state.anoInicio.split("-");
            var titulacao = this.state.anoTitulacao.split("-");
        }

        this.state.dados.forEach(el=>{
            if((el.AnoInicio >= inicio) && (el.AnoTitulacao <= titulacao) && (el.Nivel === "Apenas Doutorado")){
                DoutoradosFiltrados.push(el)
                qntDoutorado++
            }
        })
        
        console.log('Doutorados filtrados:',DoutoradosFiltrados)
        this.setState({...this.state, filtrados: DoutoradosFiltrados, total:qntDoutorado, doutorados:qntDoutorado, mestrados:0})
    }

    render(){
        return(
          <React.Fragment>
                {console.log(this.state.anoInicio)}
                <div className="form-pesquisa">
                    <input type="month" id="dataInicial" name="dataInicial" onChange={this.handleChangeAnoInicio}></input>
                    <input type="month" id="dataFinal" name="dataFinal" onChange={this.handleChangeAnoTitulacao}></input>  
                    
                    <button style={{marginRight:"20px",backgroundColor:"coral",border:"1px solid lightcoral"}} onClick={this.filtro}>Pesquisar Mestrado e Doutorado</button>
                    <button style={{marginRight:"20px",backgroundColor:"dodgerblue",border:"1px solid aquamarine"}} onClick={this.Mestrado} >Pesquisar apenas Mestrado </button>
                    <button style={{marginRight:"20px",backgroundColor:"limegreen",border:"1px solid limegreen"}} onClick={this.Doutorado}>Pesquisar apenas Doutorado </button>
                </div>
               
                <div className="perspectiva">
                    
                    <div>
                        {this.fetchBolsaAgencia(this.state.filtrados,this.state.agora)}
                    </div>
                    <div>
                        {this.fetchAno(this.state.filtrados)}
                    </div>
                    <div className="analise">
                        <div className="bo-header"> Analise dos dados</div>
                        <div className="analise-body">
                            <div className="texto-perspectiva">
                                { (this.state.total) ?
                                    <React.Fragment>
                                        <h5> Total de registros pesquisados: {this.state.total}</h5> 
                                        {(this.state.mestrados)? <h6>Quantidade de Mestrados: {this.state.mestrados}</h6>:<h6>Quantidade de Mestrados: 0</h6>}
                                        {(this.state.doutorados)? <h6>Quantidade de Doutorados: {this.state.doutorados}</h6>:<h6>Quantidade de Doutorados: 0</h6>}
                                        <hr></hr>
                                        <h5> Total de Bolsas: {this.state.totalBolsas}</h5>
                                        {(this.state.faperj)? <h6>Quantidade de Bolsas FAPERJ: {this.state.faperj}</h6>:<h6>Quantidade de Bolsas FAPERJ: 0</h6>}
                                        {(this.state.cnpq)? <h6>Quantidade de Bolsas CNPQ: {this.state.cnpq}</h6>:<h6>Quantidade de Bolsas CNPQ: 0</h6>}
                                        {(this.state.capes)? <h6>Quantidade de Bolsas CAPES: {this.state.capes}</h6>:<h6>Quantidade de Bolsas CAPES: 0</h6>}    
                                    </React.Fragment>
                                :
                                "Espaço reservado para uma análise escrita dos dados."}
                            </div>
                        </div>
                    </div>
                </div>      
          </React.Fragment>
        )
    }
}