import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');
const VideoChat = () => {
const localVideoRef = useRef(null);
const remoteVideoRef = useRef(null);
const peerRef = useRef(null);
const [inCall, setInCall] = useState(false);
useEffect(() => {
socket.on('offer', async (offer) => {
if (!peerRef.current) {
createPeer();
}
await peerRef.current.setRemoteDescription(offer);
const answer = await peerRef.current.createAnswer();
await peerRef.current.setLocalDescription(answer);
socket.emit('answer', answer);
});
socket.on('answer', async (answer) => {
await peerRef.current.setRemoteDescription(answer);
});
socket.on('candidate', async (candidate) => {
await peerRef.current.addIceCandidate(candidate);
});
return () => {
socket.off('offer');
socket.off('answer');
socket.off('candidate');
};
}, []);
const createPeer = () => {
const peer = new RTCPeerConnection({
iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
});
peer.onicecandidate = (event) => {
if (event.candidate) {
socket.emit('candidate', event.candidate);
}
};
peer.ontrack = (event) => {
remoteVideoRef.current.srcObject = event.streams[0];
};
peerRef.current = peer;
};
const startCall = async () => {
const stream = await navigator.mediaDevices.getUserMedia({
video: true, audio: true });
localVideoRef.current.srcObject = stream;
createPeer();
stream.getTracks().forEach((track) =>
peerRef.current.addTrack(track, stream));
const offer = await peerRef.current.createOffer();
await peerRef.current.setLocalDescription(offer);
socket.emit('offer', offer);
setInCall(true);
};
return (
<div>
<h2>Відеочат</h2>
<video ref={localVideoRef} autoPlay playsInline muted />
<video ref={remoteVideoRef} autoPlay playsInline />
{!inCall && <button onClick={startCall}>Почати
дзвінок</button>}
</div>
);
};
export default VideoChat;