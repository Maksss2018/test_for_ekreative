import React, { Component } from 'react';
import logo from './logo.svg';
const arr = [[15,5],[14,5],[13,5],[12,5],[11,5],[10,5],[9,5],[8,5],[7,5],[6,5],[5,5]];
const arrLine = [{start:[0,5],end:[20,15]},{start:[35,20],end:[65,35]},{start:[86,39],end:[99,56]}];
class App extends Component {
   constructor(){
     super();
     this.state={
       pixel:2,
       w:800,
       h:400,
       machinLng:[]
     }
     this.updateCanvas= this.updateCanvas.bind(this);
     this.handelUpdateCanvas= this.handelUpdateCanvas.bind(this);
   this.getPreBinaryData= this.getPreBinaryData.bind(this);
    this.deleteData= this.deleteData.bind(this);
    this.handelDeleteData = this.handelDeleteData.bind(this);
    this.HandelMakeSpideNet =this.HandelMakeSpideNet.bind(this);
    this.HandelmakeBinaryCode=this.HandelmakeBinaryCode.bind(this);
    this.makeBinaryCode=this.makeBinaryCode.bind(this);
   this.updateCanvasRect =this.updateCanvasRect.bind(this);
     
   }
    handelDeleteData(){
        this.deleteData();
    }
    
    handelUpdateCanvas(){
      let {pixel} =this.state;
      for(let i=0 ;i<=arrLine.length-1;i++){
        let obj = {
          start:arrLine[i].start,
          end:arrLine[i].end,
          lineW:1,
          color:"green"
        };
        this.updateCanvas(obj);
      }
          
    }
    HandelMakeSpideNet(){
      this.makeSpideNet();
    }
    HandelmakeBinaryCode(){
      this.makeBinaryCode();
    }
    makeBinaryCode(){
      let ctx = this.refs.canvas.getContext('2d'),
      {w,h,pixel} =this.state,
      dot = w/pixel,
      StepX=w/dot,
      StepY=h/dot,
      newPreBinare=[],
      binare=[];
      
      // let data = ctx.getImageData(x,y,StepX,StepY);
       
       console.log("///1//// "+Object.keys(ctx.getImageData(0,5,50,50)));
       console.log("////2////"+JSON.stringify(ctx.getImageData(0,5,50,50).data ));
       console.log("///3///"+ctx.getImageData(0,5,50,50).data[1]);
       console.log("////4////"+JSON.stringify( ctx.getImageData(50,50,50,50)));
       
      
      for(let x=0 ;x<=w ; x +=StepX ){
       for(let y=0 ;y<=h ; y +=StepY){
      let data = ctx.getImageData(x,y,StepX,StepY);
      let countTrue=0;
          for(let c=0;c < data.data.length-1; c +=pixel/2 ){
            let empty = data.data[c]===0;
            if(!empty){
          countTrue+=1;    
            }
          }
            if(countTrue>=1&&newPreBinare){
          newPreBinare.push([x,y,StepX,StepY]); 
            // this.updateCanvas({start:[x,y],end:[x,y],lineW:0.3,color:"yellow"});
            this.updateCanvasRect({ x:x, y:y, w:StepX,h:StepY,color:"red"})
            }
             
            binare.push(countTrue>=1?1:0);     
         }
      }
       this.setState({machinLng:binare});
    }    
    makeSpideNet(){
      let {w,h,pixel} =this.state,
      dot = w/pixel,
      StepX=w/dot,
      StepY=h/dot;
      for(let x=0 ;x<w ; x +=StepX ){
       this.updateCanvas({start:[x , 0],end:[x ,h],lineW:0.1,color:"red"})
      
      }
        for(let y=0 ;y<h ; y +=StepY){
       this.updateCanvas({start:[0, y],end:[w,y],lineW:0.1,color:"red"})

      }
    }
  
    updateCanvasRect(obj) {
    // let  {x,y,w,h}= obj;
     let  {x,y,w,h,color}= obj;
        const ctx = this.refs.canvas.getContext('2d');
              ctx.fillRect(x,y,w,h);
              ctx.strokeStyle=color;
    }  
    updateCanvas(obj) {
    // let  {x,y,w,h}= obj;
     let  {start,end,lineW,color}= obj;
        const ctx = this.refs.canvas.getContext('2d');
//        ctx.fillRect(obj.x,obj.y,obj.w,obj.h);
          ctx.beginPath();
          ctx.strokeStyle=color;
          ctx.lineWidth=lineW;
          ctx.lineJoin="miter";
//          ctx.moveTo(obj.x,obj.y);
          ctx.moveTo(start[0],start[1]);
          ctx.lineTo(end[0],end[1]);
          ctx.stroke();
  
    }
    getPreBinaryData(obj) {
     let  {x,y,w,h}= obj;
        const ctx = this.refs.canvas.getContext('2d');
//        ctx.fillRect(obj.x,obj.y,obj.w,obj.h);
          ctx.fillStyle="green";
          ctx.strokeStyle="red";
          ctx.lineWidth=1;
          ctx.lineJoin="miter";
          ctx.rect(obj.x,obj.y,obj.w,obj.h);
          ctx.fill();
    }
    deleteData(){
      let {w,h} = this.state;
        const ctx = this.refs.canvas.getContext('2d');
      ctx.clearRect(0,0,w,h);
    }
  
  render() {
    let{w,h,machinLng} = this.state;
    
    return (      <div className="App">
        <header className="App-header">
          <p>
            Canvas
          </p>
          <input onClick={this.handelDeleteData} type="button" name="button" value="Delete Data" /> 
          <input onClick={this.handelUpdateCanvas} type="button" name="button" value="button to click" />
          <input onClick={this.HandelMakeSpideNet} type="button" name="button" value="Draw net" />
               <input onClick={this.HandelmakeBinaryCode} type="button" name="button" value="make it  binare" />
 
   <canvas ref="canvas" width={w} height={h}>
   js is not working
   </canvas>
        </header>
      </div>
    );
  }
}

export default App;

