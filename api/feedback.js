let memoria = {}; 

export default async function handler(req,res){
  if(req.method==='POST'){
    const { recomendacao, resultado } = await req.json();
    if(!memoria[recomendacao]) memoria[recomendacao]={ acertos:0,erros:0 };
    if(resultado==='acerto') memoria[recomendacao].acertos++;
    if(resultado==='erro') memoria[recomendacao].erros++;
    res.status(200).json({ ok:true, memoria });
  } else {
    res.status(405).json({ ok:false, message:"Método não permitido" });
  }
}
