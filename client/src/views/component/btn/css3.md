```less
    @keyframes scale {
        0%{
            transform: scale(1);
        }
        30%{
            transform: scaleY(1.6);
        }
        60%{
            transform: scale(1.2,1);
        }
        100%{
            transform: scale(1);
        }
    }
    .scale{
        animation: scale .5s ease-out;
    }

    .button {
        background: linear-gradient(135deg, #d3e669, #7ec9b9);
        width: 180px;
        height: 50px;
        line-height: 50px;
        margin: 30px 0;
        
        border-radius: 3px;
        font-family: 'Roboto'; 
        text-align: center;
        color: #FFF;
        user-select: none;
        
        &:hover {
            cursor: pointer;
        }
        
        &:after {
            content: "";
            display: block;
            position: relative;
            width: 100%;
            height: 10%;
            border-radius: 50%;
            background-color: darken(#f1c40f, 20%);
            opacity: 0.4;
            bottom: -20px;
        }
    }
```