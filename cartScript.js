let cart=[];
let totalCost=0;
function addPrice(){
  // var t=document.getElementById("cartTable");
   document.getElementById("cartTable").style.display="table";

    var id=document.getElementById("eventId").value;
    var name=document.getElementById("eventName").value;
    var price=document.getElementById("price").value;

    if(isNaN(id)||!name||isNaN(price)){
        document.getElementById("total").innerHTML="please enter valid details.";
        return;
    }

    cart.push({id:id,name:name,price:price,quantity:1});
    renderCart();

    document.getElementById("eventId").value='';
    document.getElementById("eventName").value='';
    document.getElementById("price").value='';

}

function renderCart(){
    var cartBody=document.getElementById("cartBody");
    cartBody.innerHTML='';
    cart.forEach((item,index)=>{
        var row=document.createElement("tr");
        var idCell=document.createElement("td");
        idCell.textContent=`${item.id}`;
        row.appendChild(idCell);

        var nameCell=document.createElement("td");
        nameCell.textContent=item.name;
        row.appendChild(nameCell);

        var priceCell=document.createElement("td");
        priceCell.textContent=`$${item.price}`;
        row.appendChild(priceCell);

        var quantityCell=document.createElement("td");

        var selectCell=document.createElement("select");
        selectCell.value=item.quantity;
        selectCell.id="select"+index;


        for(var i=1;i<11;i++){
            var optionCell=document.createElement("option");
            optionCell.value=i;
            optionCell.textContent=i;
            selectCell.appendChild(optionCell);
        }

        selectCell.onchange=()=>{
            item.quantity=parseInt(selectCell.value);
            calculateTotal();
        }
        quantityCell.appendChild(selectCell);
        row.appendChild(quantityCell);

        var removeCell=document.createElement("td");
        var removeLink=document.createElement("span");
        removeLink.className="remove-link";
        removeLink.id=`link${index}`;
        removeLink.textContent="Remove";
        removeLink.onclick=()=>removeRow(index);
        removeCell.appendChild(removeLink);
        row.appendChild(removeCell);

        cartBody.appendChild(row);

    });
    calculateTotal();
}
function calculateTotal(){
    totalCost=cart.reduce((sum,item)=>sum+(item.price*item.quantity),0);
    document.getElementById("total").innerHTML=`The total cost is $${totalCost}`;
}
function removeRow(index){
    cart.splice(index,1);
    renderCart();
}