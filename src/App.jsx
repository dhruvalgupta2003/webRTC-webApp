  import { useRef, useEffect } from 'react'
  import io from 'socket.io-client'
  import './App.css'


  const socket = io(
    '/webRTCPeers',
    {
      path:'/webrtc'
    }
  )

  // const socket = io('http://localhost:8080/webRTCPeers');


  function App() {
    const localVideoRef = useRef()
    const remoteVideoRef = useRef()
    const pc = useRef(new RTCPeerConnection(null))
    const textRef = useRef()
    const candidates = useRef([])

    useEffect(() => {
      socket.on('connection-success', success =>{
        console.log(success)
      })

      socket.on('sdp', data =>{
        console.log(data)
        textRef.current.value = JSON.stringify(data.sdp)
      })

      socket.on('candidate', candidate => {
        console.log(candidate)
        candidates.current = [...candidates.current, candidate]
      })

      const constraints = {
        audio: false,
        video: true,  
      }
      navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => { 
        //display video
        localVideoRef.current.srcObject = stream

        stream.getTracks().forEach(track => {
          _pc.addTrack(track, stream)
        })

      })
      .catch(e => {
        console.log("getUserMedia Error ...",e)
      })

      const _pc = new RTCPeerConnection(null)
      _pc.onicecandidate = (e) =>{
        if(e.candidate)
          console.log(JSON.stringify(e.candidate))
          socket.emit('candidate',e.candidate)
      }

      _pc.oniceconnectionstatechange = (e) => { 
        console.log(e) //connect, disconnected, failed,closed
      }

      _pc.ontrack = (e) => {
        //we got remote stream...
        remoteVideoRef.current.srcObject = e.streams[0]
      }

      pc.current = _pc
    }, [])

    
    const createOffer = () =>{
      pc.current.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      }).then(sdp =>{
        console.log(JSON.stringify(sdp))
        pc.current.setLocalDescription(sdp)

        //send the sdp to signalling server
        socket.emit('sdp', {
          sdp,
        })
      }).catch( e => console.log(e))

    }

    const createAnswer = () =>{
      pc.current.createAnswer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      }).then(sdp =>{
        console.log(JSON.stringify(sdp))
        pc.current.setLocalDescription(sdp)

        //send the answer sdp to the offering peer
        socket.emit('sdp',{
          sdp,
        })
      }).catch( e => console.log(e))

    }

    const setRemoteDescription = () =>{
      //get the value of sdp from textArea
      const sdp = JSON.parse(textRef.current.value)
      console.log(sdp)
      pc.current.setRemoteDescription(new RTCSessionDescription(sdp))
    }

    // const addCandidate = () =>{
    //   // const candidate = JSON.parse(textRef.current.value)
    //   // console.log("Adding Candidate...",candidate)
    //   candidates.current.forEach(candidate => {
    //     console.log(candidate)
    //     pc.current.addIceCandidate(new RTCIceCandidate(candidate))

    //   })
    const addCandidate = () => {
      candidates.current.forEach(candidate => {
        if (candidate.sdpMid !== null && candidate.sdpMLineIndex !== null) {
          console.log(candidate);
          pc.current.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
          console.log("Invalid candidate:", candidate);
        }
      });
    };


    
    return (

      <>
         <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="relative w-64 h-64">
              <video
                ref={localVideoRef}
                className="w-full h-full object-cover"
                autoPlay
              />
            </div>
            <div className="relative w-64 h-64">
              <video
                ref={remoteVideoRef}
                className="w-full h-full object-cover bg-black"
                autoPlay
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={createOffer}
            >
              Create Offer
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={createAnswer}
            >
              Create Answer
            </button>
            <textarea
              ref={textRef}
              className="bg-gray-700 text-white p-2 rounded"
              rows={5}
            />
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={setRemoteDescription}
            >
              Set Remote Description
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={addCandidate}
            >
              Add Candidates
            </button>
          </div>
        </div>
      </div>
      </>
    )
  }

  export default App
          