import { TypeAnimation } from 'react-type-animation';


const Typer = () => {
  return <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'Chat with your own AI',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Built with OPENAI',
                2000,
                'Your own customized ChatGPT',
                1500
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '60px', 
                display: 'inline-block', 
                color: 'white', 
                textShadow: '1px 1px 20px #000'}}
            repeat={Infinity}
            />
}

export default Typer
