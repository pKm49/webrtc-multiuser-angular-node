import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-studentclass',
  templateUrl: './studentclass.component.html',
  styleUrls: ['./studentclass.component.css']
})
export class StudentclassComponent implements OnInit {
  localVideo: HTMLVideoElement;
  remoteVideo: HTMLVideoElement;
  public socket;
  public offer;
  public configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
  public peerConnection = new RTCPeerConnection(this.configuration);

  studentid = 'tempstudent' + Date.now();

  constructor() { }



  async ngOnInit() {
    console.log('asdasdasdsa')

    const localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    const localhost = document.getElementById('host');
    this.localVideo = document.createElement('video');
    this.localVideo.setAttribute('autoplay', 'true');
    this.localVideo.srcObject = localStream;
    localhost.appendChild(this.localVideo);

    localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, localStream);

    });

    this.socket = io(environment.socket, {
      query: {
        usertype: 'student',
        studentid: this.studentid
      }
    });



    this.socket.on('newoffer', async (offerObject) => {
      // console.log(msg.data)

      console.log("offerObject")
      console.log(offerObject)

      if (offerObject.studentid == this.studentid) {
        if (this.offer == null) {
          this.offer = offerObject.offer;

          this.peerConnection.setRemoteDescription(new RTCSessionDescription(offerObject.offer));
          const answer = await this.peerConnection.createAnswer();
          this.peerConnection.setLocalDescription(answer);

          var answerObject = {
            studentid: this.studentid,
            answer: answer
          }

          this.socket.emit('answer', answerObject);





        }
      }



    });

    this.peerConnection.onicecandidate = (msg) => {
      console.log('onicecandidatestudent triggered in student side' + msg)

      if (msg.candidate) {
        var iceCandidateobject = {
          studentid: this.studentid,
          candidate: msg.candidate
        }
        this.socket.emit('onicecandidatestudent', iceCandidateobject);
      }
    };

    this.peerConnection.ontrack = (event) => {
      const remotestream = new MediaStream();
      remotestream.addTrack(event.track);
      console.log('got mediastream', event.streams);
      const remotehost = document.getElementById('remote');
      this.remoteVideo = document.createElement('video');
      this.remoteVideo.setAttribute('autoplay', 'true');
      this.remoteVideo.srcObject = remotestream;
      remotehost.appendChild(this.remoteVideo);

    };

    this.socket.on('onicecandidateteacher', async (iceCandidateobject) => {
      console.log('onicecandidateteacher recieved in student side')

      if (iceCandidateobject.studentid == this.studentid) {
        // console.log(msg.data)
        this.peerConnection.addIceCandidate(new RTCIceCandidate(iceCandidateobject.candidate));

      }



    });

    

  }
}
