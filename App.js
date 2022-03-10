import React, {useState, useRef} from 'react';
import { SafeAreaView, Text, Button } from 'react-native';
import LinkedInModal from 'react-native-linkedin';
const App = () => {
  
  // After the set modalvisibility, page needs to reload to see modal
  const [reloadpage, setReloadpage] = useState()
  
  // To use linkedinmodal with a button
  const linkedinRef = useRef(null) 
  
  return(
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <LinkedInModal 
          ref={linkedinRef}
          clientID= {YOUR CLIENT ID}
          clientSecret= {YOUR CLIENT SECRET}
          redirectUri= "http://localhost:8081/auth/linkedin/callback"
          onSuccess= {
            token =>{
              let name_surname = "https://api.linkedin.com/v2/me";
              let user_mail = "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))";
              let namereq = new XMLHttpRequest();
                namereq.open("GET", user_mail);
                namereq.setRequestHeader("Authorization", "Bearer " + token.access_token);
                namereq.onreadystatechange = function(){
                  if(namereq.readyState === 4){
                    console.log("Text:" , namereq.responseText);;
                  }
                }
                namereq.send();
            }
          }
      />

      <Button
        onPress={()=>{
          linkedinRef.current.state.modalVisible = true
          setReloadpage("Refresh page to see modal")
        }
        title="Trigger Linkedin"
      />
    </SafeAreaView>
  );
}

export default App;
