import './App.css';
import KuralFetch from './components/KuralFetch'
import thirukkural from './media/Thirukkural.png'

function App() {
  return (
    <div className="App"> 
      <h1> Thirukkural </h1>
			<h3>  Thirukkural , is a classic Tamil text consisting of 1,330 short couplets, or kurals, of seven words each.
				 The text is divided into three major sections as virtue (aram), wealth (porul) and love (inbam), respectively.
				 Further, it has 133 chapter groups with 10 kurals in each chapter. It was written by 
				 Thriuvalluvar.</h3>
			<img src= {thirukkural} alt = 'Thiruvalluvar' height ={300} width={300} />  
      <br/><br/>
      <KuralFetch />
    </div>
  );
}

export default App;