import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import styled from 'styled-components';
import icon from './iconButton.svg';
import error from './error.svg'
import { AudioPlayer } from "./AudioPlayerComponent";
import { TextField } from "@mui/material";

type TProps = {
  link: string
}
const App: React.FC<{}> = () => {
  const [linkState, setLinkState] = React.useState<string>()
  const { reset, control, handleSubmit, formState: { errors } } = useForm<TProps>({ defaultValues: { link: linkState } })
  const onSubmit = (data: TProps) => {
    setTimeout(() => { setLinkState(data.link) },)
  }
  useEffect(() => {
    reset({ link: undefined })
  }, [linkState, reset])

  return (
    <Content>
      <Modal>
        {!linkState && (
          <form>
            <InputWithLabel>
              <Label htmlFor="input-link">Insert the link</Label>
              <InputWithButton>
                <Controller
                  control={control}
                  name="link"
                  rules={{
                    pattern: {
                      value: /^[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?$/,
                      message: 'Error message here'
                    }
                  }}
                  render={({ field }) =>
                    <Input
                      variant="standard"
                      id="input-link"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="https://"
                      // sx={{height: "96px"}}
                      InputProps={{
                        endAdornment: (
                          <img src={errors.link ? error : ''} alt='' />
                        ),
                        disableUnderline: true, // <== added this
                      }}
                    />
                  }
                />
                <Button type="submit" onClick={handleSubmit(onSubmit)}><Icon src={icon} /></Button>
              </InputWithButton>
              <LabelError htmlFor="input-link">{errors.link?.message}</LabelError>
            </InputWithLabel>
          </form>
        )
        }
        {linkState && (
          <AudioPlayer link={linkState} onBack={() => setLinkState(undefined)} />
        )}
      </Modal>
    </Content>
  )
}
export default App

const Content = styled.div`
  @font-face {
    src: url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');
    font-family: 'Space Grotesk', sans-serif;
  }
  display: flex;
  justify-content: center;
  background-color: #C4C4C4;
  height: 100vh;
  align-items: center;
`
const Input = styled(TextField)`
& .MuiInput-root{
  width: 761px;
  height: 96px;
  font-size: 24px;
  padding: 32px 16px;
  background-color: white;
  background-image: url("../src/error.svg");
  border-radius: 0%;
  border-color: white
}
`
const Button = styled.button`
  width: 96px;
  height: 96px;
  background-color: #F8D231;
 &:hover{
  background-color:rgb(224, 191, 42);
 }
  border: none;
`
const Icon = styled.img`
`
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #EEEEEE;
  /* position: relative; */
  align-items: center;
  justify-content: center;
  width: 1440px;
  height: 810px;
  font-family: inherit;
`
const Label = styled.label`
  font-size: 40px;
  padding: 20px 0;
  @font-face {
    src: url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');
    font-family: 'Space Grotesk', sans-serif;
  }
`
const InputWithLabel = styled.div`
display: flex;
flex-direction: column;
font-family: inherit;
`
const InputWithButton = styled.div`
  display: flex;
  flex-direction: row;

`
const LabelError = styled.label`
  font-size: 16px;
  color: #C6A827;
  height: 20px;
`