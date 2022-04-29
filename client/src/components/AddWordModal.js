import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withSnackbar } from 'notistack'
import { handleAddWord } from '../actions/word'


class AddWordModal extends Component {
    state = {
        input: '',
        isDuplicate: false,
        loading: false
    }

    setInput(input) {
        this.setState({ input })
        const isDuplicate = this.props.words.some(word => word.word === input)
        if (isDuplicate) this.setState({ isDuplicate })
        else this.setState({ isDuplicate })
    }

    onClose = () => {
        this.setState({ input: '' })
        
    }
    handleAddBtn(e) {
        e.preventDefault()
  this.setState({ loading: true })
  this.props.handleAddWord(this.state.input)
      .then((res) => {
        this.props.enqueueSnackbar(`${this.state.input} added Successfully`, {
          variant: 'success',
          autoHideDuration: 2000,
        })
        this.setState({ input: '', loading: false })
        this.props.handleClose()
        console.log(res)
      })
        .catch((err) => {
            this.props.enqueueSnackbar(`${this.state.input} already Exists`, {
                variant: 'error',
                autoHideDuration: 2000,
            })
            this.setState({ input: '', loading: false })
            console.log(err)
            })
        
}

    
  


    render() {
        const { open, handleClose } = this.props
        return (
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add To Dictionary</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="word"
                        label="New Word"
                        type="Text"
                        onKeyUp={e => this.setInput(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAddBtn.bind(this)} color="primary">
                        {this.state.loading ? <CircularProgress size={24} /> : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
            
}

const mapStateToProps = (words) => {
    return {
        words
    }
}

export default connect(mapStateToProps, { handleAddWord })(withSnackbar(AddWordModal))
